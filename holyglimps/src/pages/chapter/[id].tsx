import { useRouter } from 'next/router';

import { useSession, getSession } from "next-auth/react"

import axios from 'axios';
import { useState, useEffect } from 'react';
import ChapterSelector from '@/components/chapterselector';

export default function Page() {
    const { data: session, status } = useSession()

    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);
    console.log(router.query.id)

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(id, "id")
                const options = {
                    method: 'GET',
                    url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${id}/`,
                    headers: {
                        'X-RapidAPI-Key': '5725d40cfemsh0ca35a3e8abe856p1b3effjsn2e6a501084c9',
                        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
                    },
                };

                try {
                    const response = await axios.request(options);
                    console.log(response.data)
                    setData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

        }
        fetchData();
    }, [id]); // Run the effect once when the component mounts

    if (status === "unauthenticated") {
        return <p>Access Denied Please Sign In to Access This Page</p>
    }


    // Define a function to handle the "Go Back" button click
    const handleGoBack = () => {
        router.push("/"); // This will take the user back to the previous page
    };

    return (
        <div>
            {/* Navigation bar with Go Back button */}
            <nav className="bg-blue-500 p-4 text-white">
                <div className="flex justify-between items-center">
                    <button onClick={handleGoBack} className="font-bold text-xl">Go Back</button>
                    {/* <a href="#" className="font-bold text-xl">Your App Name</a>
                    <a href="#" className="font-bold text-xl">Some Other Option</a> */}
                    <ChapterSelector />
                </div>
            </nav>

            {/* Your content */}
            {data ? (
                <div>
                    <ChapterInfo data={data} />
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

function ChapterInfo({ data }) {
    if (!data) {
        return <p>Loading data...</p>;
    }

    const {
        name,
        id,
        name_meaning,
        name_translated,
        name_transliterated,
        slug,
        chapter_number,
        verses_count,
        chapter_summary,
        chapter_summary_hindi,
    } = data;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-700">{name}</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className="text-lg text-gray-700">Chapter Number</p>
                    <p className="text-xl font-semibold">{chapter_number}</p>
                </div>
                <div>
                    <p className="text-lg text-gray-700">Verses Count</p>
                    <p className="text-xl font-semibold">{verses_count}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-lg text-gray-700">Name Meaning</p>
                <p className="text-base">{name_meaning}</p>
            </div>
            <div className="mt-4">
                <p className="text-lg text-gray-700">Chapter Summary</p>
                <p className="text-base">{chapter_summary}</p>
            </div>
        </div>
    );
}

