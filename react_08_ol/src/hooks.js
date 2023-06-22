import { useState, useEffect } from "react";

function useScript(src) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let script = document.querySelector(`script[src="${src}"]`);
        if(!script) {
            script = document.createElement("script");
            script.src = src;
            script.async = true;
        }

        const handleLoad = () => setLoading(false);
    },[src])
}