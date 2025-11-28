// —————————————————————————————
// src/pages/Dashboard.jsx
// —————————————————————————————

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Navbar from "../components/Navbar";
import DocumentTitle from "../components/DocumentTitle";
import GreetingCard from "../components/dashboard/GreetingCard";
import JobStats from "../components/dashboard/JobStats";
import AddJobForm from "../components/dashboard/AddJobForm";
import SearchBar from "../components/dashboard/SearchBar";
import FilterBar from "../components/dashboard/FilterBar";
import JobCard from "../components/dashboard/JobCard";
import EditModal from "../components/dashboard/EditModal";
import DeleteModal from "../components/dashboard/DeleteModal";
import DetailModal from "../components/dashboard/DetailModal";
import { useDashboard } from "../hooks/useDashboard";
import { useJobs } from "../hooks/useJobs";
import { filterAndSortJobs } from "../utils/jobFilters";

export default function Dashboard() {
    const { user } = useDashboard();
    const {
        jobs,
        loading: jobsLoading,
        fetchJobs,
        createJob,
        updateJob,
        removeJob,
    } = useJobs(user?.id);

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // 10 job per halaman

    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const [showAddNotif, setShowAddNotif] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, jobId: null });
    const [editModal, setEditModal] = useState({ show: false, job: null });
    const [detailModal, setDetailModal] = useState({ show: false, job: null });

    // Dark mode persistence
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Fetch jobs when user ready
    useEffect(() => {
        if (user?.id) {
            fetchJobs();
        }
    }, [user?.id, fetchJobs]);

    // Handle add job (FROM AddJobForm)
    const handleAddJob = async ({
        company,
        position,
        location,
        salary,
        jobDetails,
        createdDate,
        expiryDate,
        keterangan,
    }) => {
        const newJob = {
            user_id: user.id,
            company: company.trim(),
            title: position.trim(),
            location: location.trim(),
            salary: salary?.trim() || "-",
            job_details: jobDetails?.trim() || "-",
            status: "Aktif",
            keterangan: keterangan?.trim() || "Sedang Di Review",
            created_at: createdDate,
            expires_at: expiryDate,
            priority: "medium",
            follow_up_at: expiryDate,
        };

        const result = await createJob(newJob);

        if (result.success) {
            setShowAddNotif(true);
            setTimeout(() => setShowAddNotif(false), 2000);
        } else {
            alert("Gagal menambah job: " + result.error);
        }
    };

    // Handle update job (FROM EditModal)
    const handleUpdateJob = async () => {
        if (
            !editModal.job?.company?.trim() ||
            !editModal.job?.title?.trim() ||
            !editModal.job?.location?.trim()
        ) {
            alert("Semua kolom wajib diisi!");
            return;
        }

        if (editModal.job.created_at && editModal.job.expires_at) {
            const createdDate = new Date(editModal.job.created_at);
            const expiryDate = new Date(editModal.job.expires_at);

            if (expiryDate <= createdDate) {
                alert("Tanggal kadaluarsa harus lebih besar dari tanggal dibuat!");
                return;
            }
        }

        const result = await updateJob(editModal.job.id, {
            company: editModal.job.company.trim(),
            title: editModal.job.title.trim(),
            location: editModal.job.location.trim(),
            salary: editModal.job.salary?.trim() || "-",
            job_details: editModal.job.job_details?.trim() || "-",
            keterangan: editModal.job.keterangan?.trim() || "Sedang Di Review",
            created_at: editModal.job.created_at,
            expires_at: editModal.job.expires_at,
            priority: editModal.job.priority || "medium",
            follow_up_at: editModal.job.follow_up_at || editModal.job.expires_at,
        });

        if (result.success) {
            setEditModal({ show: false, job: null });
            setShowAddNotif(true);
            setTimeout(() => setShowAddNotif(false), 2000);
        } else {
            alert("Gagal update: " + result.error);
        }
    };

    // Handle delete job
    const handleDeleteJob = async (id) => {
        const result = await removeJob(id);

        if (result.success) {
            setDeleteModal({ show: false, jobId: null });
        } else {
            alert("Gagal hapus: " + result.error);
        }
    };

    // Copy job
    const handleCopyJob = (job) => {
        const text = `Perusahaan: ${job.company}\nPosisi: ${job.title}\nLokasi: ${job.location}`;
        navigator.clipboard.writeText(text);
        alert("Info job disalin!");
    };

    // Stats
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => new Date(j.expires_at) >= new Date()).length;
    const expiredJobs = totalJobs - activeJobs;

    // Filter & sort dasar
    let filteredJobs = filterAndSortJobs(jobs, searchQuery, filter, sortBy);

    // Filter prioritas
    if (priorityFilter !== "all") {
        filteredJobs = filteredJobs.filter(
            (job) => (job.priority || "medium") === priorityFilter
        );
    }

    // Pagination
    const totalItems = filteredJobs.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);


    // Hitung perlu follow-up
    const today = new Date();
    const needFollowUpCount = jobs.filter((j) => {
        if (!j.follow_up_at) return false;
        const f = new Date(j.follow_up_at);
        return f <= today && new Date(j.expires_at) >= today;
    }).length;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filter, sortBy, priorityFilter]);


    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
                }`}
        >
            <DocumentTitle title="Dashboard" />

            {user && (
                <Navbar
                    user={user}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentPage="dashboard"
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                {user && (
                    <>
                        <GreetingCard
                            user={user}
                            totalJobs={totalJobs}
                            activeJobs={activeJobs}
                            expiredJobs={expiredJobs}
                            darkMode={darkMode}
                        />

                        <JobStats
                            totalJobs={totalJobs}
                            activeJobs={activeJobs}
                            expiredJobs={expiredJobs}
                            darkMode={darkMode}
                        />

                        <AddJobForm onSubmit={handleAddJob} darkMode={darkMode} />

                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onClear={() => setSearchQuery("")}
                            darkMode={darkMode}
                        />

                        <FilterBar
                            filter={filter}
                            setFilter={setFilter}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            darkMode={darkMode}
                        />

                        {/* Ringkasan follow-up + filter prioritas */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <div
                                className={
                                    darkMode ? "text-gray-300 text-sm" : "text-gray-700 text-sm"
                                }
                            >
                                Perlu follow-up:{" "}
                                <span
                                    className={
                                        darkMode
                                            ? "text-blue-400 font-semibold"
                                            : "text-blue-600 font-semibold"
                                    }
                                >
                                    {needFollowUpCount} lamaran
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    className={
                                        darkMode ? "text-gray-400 text-xs" : "text-gray-600 text-xs"
                                    }
                                >
                                    Prioritas:
                                </span>
                                <select
                                    value={priorityFilter}
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs border ${darkMode
                                        ? "bg-gray-800 border-gray-700 text-gray-100"
                                        : "bg-white border-gray-300 text-gray-800"
                                        }`}
                                >
                                    <option value="all">Semua</option>
                                    <option value="high">Tinggi</option>
                                    <option value="medium">Sedang</option>
                                    <option value="low">Rendah</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {/* Job Grid */}
                <div className="job-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {paginatedJobs.map((job) => {
                        const expired = new Date(job.expires_at) < new Date();
                        return (
                            <JobCard
                                key={job.id}
                                job={job}
                                expired={expired}
                                dark={darkMode}
                                onCopy={() => handleCopyJob(job)}
                                onEdit={() => setEditModal({ show: true, job: { ...job } })}
                                onDelete={() =>
                                    setDeleteModal({ show: true, jobId: job.id })
                                }
                                onViewDetail={() =>
                                    setDetailModal({ show: true, job: { ...job } })
                                }
                            />
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalItems > 0 && (
                    <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p
                            className={
                                darkMode ? "text-xs text-gray-400" : "text-xs text-gray-600"
                            }
                        >
                            Menampilkan{" "}
                            <span className="font-semibold">
                                {startIndex + 1}-{Math.min(endIndex, totalItems)}
                            </span>{" "}
                            dari <span className="font-semibold">{totalItems}</span> lamaran
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${safePage === 1
                                        ? "cursor-not-allowed opacity-40"
                                        : darkMode
                                            ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                Prev
                            </button>

                            <div
                                className={
                                    darkMode ? "text-xs text-gray-300" : "text-xs text-gray-700"
                                }
                            >
                                Page{" "}
                                <span className="font-semibold">
                                    {safePage}/{totalPages}
                                </span>
                            </div>

                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={safePage === totalPages}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${safePage === totalPages
                                        ? "cursor-not-allowed opacity-40"
                                        : darkMode
                                            ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}


                {/* Empty state */}
                {!jobsLoading && filteredJobs.length === 0 && (
                    <div className="text-center py-20">
                        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                            {searchQuery ||
                                filter !== "all" ||
                                sortBy !== "newest" ||
                                priorityFilter !== "all"
                                ? "Tidak ada lamaran yang sesuai dengan filter"
                                : "Belum ada lamaran"}
                        </p>
                    </div>
                )}
            </div>

            {/* Notif sukses */}
            {showAddNotif && (
                <div className="fixed top-20 right-4 sm:right-6 z-50 animate-slideIn">
                    <div
                        className={`px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-sm ${darkMode ? "bg-green-600/90" : "bg-green-500/90"
                            }`}
                    >
                        <Check className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">Berhasil!</span>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.show && (
                <EditModal
                    job={editModal.job}
                    dark={darkMode}
                    onClose={() => setEditModal({ show: false, job: null })}
                    onSave={handleUpdateJob}
                    onChange={(field, value) =>
                        setEditModal((prev) => ({
                            ...prev,
                            job: { ...prev.job, [field]: value },
                        }))
                    }
                />
            )}

            {/* Delete Modal */}
            {deleteModal.show && (
                <DeleteModal
                    dark={darkMode}
                    onClose={() => setDeleteModal({ show: false, jobId: null })}
                    onDelete={() => handleDeleteJob(deleteModal.jobId)}
                />
            )}

            {/* Detail Modal */}
            {detailModal.show && (
                <DetailModal
                    job={detailModal.job}
                    dark={darkMode}
                    onClose={() => setDetailModal({ show: false, job: null })}
                    onEdit={() => {
                        setDetailModal({ show: false, job: null });
                        setEditModal({ show: true, job: { ...detailModal.job } });
                    }}
                    onDelete={() => {
                        setDetailModal({ show: false, job: null });
                        setDeleteModal({ show: true, jobId: detailModal.job.id });
                    }}
                />
            )}

            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }

        @keyframes float-x {
          0% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }
        .animate-float-x {
          animation: float-x 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
