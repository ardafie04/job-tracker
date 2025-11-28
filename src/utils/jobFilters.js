// —————————————————————————————
// utils/jobFilters.js
// —————————————————————————————

export function filterJobs(jobs, filter) {
    const now = new Date();

    switch (filter) {
        case 'active':
            return jobs.filter(job => new Date(job.expires_at) >= now);
        case 'expired':
            return jobs.filter(job => new Date(job.expires_at) < now);
        case 'all':
        default:
            return jobs;
    }
}

export function sortJobs(jobs, sortBy) {
    const sorted = [...jobs];

    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        case 'oldest':
            return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        case 'expiringSoon':
            return sorted.sort((a, b) => new Date(a.expires_at) - new Date(b.expires_at));

        case 'companyAZ':
            return sorted.sort((a, b) => a.company.localeCompare(b.company));

        case 'companyZA':
            return sorted.sort((a, b) => b.company.localeCompare(a.company));

        default:
            return sorted;
    }
}

export function filterAndSortJobs(jobs, searchQuery, filter, sortBy) {
    // 1. Search filter
    let filtered = jobs.filter((job) => {
        const q = searchQuery.toLowerCase();
        return (
            job.company?.toLowerCase().includes(q) ||
            job.title?.toLowerCase().includes(q) ||
            job.location?.toLowerCase().includes(q)
        );
    });

    // 2. Status filter
    filtered = filterJobs(filtered, filter);

    // 3. Sort
    filtered = sortJobs(filtered, sortBy);

    return filtered;
}
