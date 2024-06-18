import axios from 'axios';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Repo } from './ListRepos';


const DetailRepo: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [detailRepo, setDetailRepo] = useState<Repo>()

    const getRepoById = (id: number) => {
        axios.get('http://localhost:8000/repos')
            .then(({ data }) => {
                setDetailRepo(data.repos.find((repo: Repo) => repo.id === id))
            })
            .catch((err) => console.log('err get data: ', err))
    }

    useEffect(() => {
        if (id) {
            getRepoById(Number(id));
        }
    }, [id])

    return (
        <div>
            <button onClick={() => navigate(-1)}>
                Back
            </button>
            <p>
                Detail of repo: <b>{detailRepo?.name}</b>
            </p>
            <table style={{ borderColor: 'black' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Commit date</th>
                        <th>Author</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{detailRepo?.name}</td>
                        <td>{detailRepo?.description}</td>
                        <td>{detailRepo?.commit_date || 'Not found'}</td>
                        <td>{detailRepo?.author || 'Not found'}</td>
                        <td>{detailRepo?.message || 'Not found'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DetailRepo;