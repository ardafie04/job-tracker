// components/DocumentTitle.jsx
import { useEffect } from 'react';

export default function DocumentTitle({ title }) {
    useEffect(() => {
        document.title = title ? `${title} | Job Tracker` : 'Job Tracker - Lacak Lamaran, Raih Impian';
    }, [title]);

    return null;
}
