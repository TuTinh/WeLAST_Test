import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/style.css';
import { useNavigate } from 'react-router-dom';

const MODE_RESET = 'reset';

export interface Repo {
    id: number;
    language: string;
    created_at: string;
    name: string;
    description: string;
    forks_count: string;
    commit_date: string;
    author: string;
    message: string
}

const ListRepos: React.FC = () => {
    const navigate = useNavigate()

    const [originRepos, setOriginRepos] = useState([]);
    const [tempRepos, setTempRepos] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [filterBy, setFilterBy] = useState(MODE_RESET);


    const filterByLanguage = (lang = filterBy) => {
        if (lang === MODE_RESET) {
            setTempRepos(originRepos);
        } else {
            setTempRepos(originRepos.filter((repo: Repo) => repo.language === lang));
        }
    }


    const getRepos = () => {
        axios.get('http://localhost:8000/repos')
            .then(({ data }) => {
                const dataRepos = data.repos;
                // setLanguages([...new Set(dataRepos.map(repo => repo.language)])
                setLanguages(Array.from(new Set(dataRepos.map((repo: Repo) => repo.language))))
                const repos = dataRepos.sort((repoPrev: Repo, repoNext: Repo) => {
                    const createdAtPrev = new Date(repoPrev.created_at)
                    const createdAtNext = new Date(repoNext.created_at)
                    return createdAtNext.getTime() - createdAtPrev.getTime();
                })
                setOriginRepos(repos);
                setTempRepos(repos);
            })
            .catch((err) => console.log('err get data: ', err))
    }

    useEffect(() => {
        getRepos()
    }, []);

    useEffect(() => {
        if (filterBy) {
            filterByLanguage(filterBy);
        }
    }, [filterBy])

    return (
        <div >
            <h1>
                Repositories
            </h1>
            <div>
                Reset list of Repositories:
                <button
                    onClick={() => setFilterBy(MODE_RESET)}
                    disabled={filterBy === MODE_RESET}
                    style={{ cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>
            <div>
                Filter by language:
                {
                    languages.map((lang, index) => (
                        lang &&
                        <button id={lang}
                            key={index}
                            onClick={(e) => setFilterBy((e.target as Element).id)}
                            disabled={filterBy === lang}
                            style={{ cursor: 'pointer' }}
                        >
                            {lang}
                        </button>
                    ))
                }
            </div>
            <table>
                <thead >
                    <tr>
                        <th>  STT </th>
                        <th>  Name </th>
                        <th> Description </th>
                        <th> Language  </th>
                        <th>  Forks count </th>
                        <th>  Created Time </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tempRepos.map((repo: Repo, index: number) => {
                            return (
                                <tr key={index}
                                    title='View detail'
                                    className='row_data'
                                    onClick={() => navigate(`/repos/${repo.id}`)}
                                >
                                    <td> {index + 1}  </td>
                                    <td> {repo.name} </td>
                                    <td> {repo.description} </td>
                                    <td> {repo.language} </td>
                                    <td> {repo.forks_count} </td>
                                    <td>  {repo.created_at} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListRepos;
