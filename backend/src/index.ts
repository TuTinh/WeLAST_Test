import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";


const app: Express = express();
const port = 8000;

app.use(cors());


app.get('/repos', async (req: Request, res: Response) => {
    const sourceRepoURL = 'https://api.github.com/users/freeCodeCamp/repos';
    let repos: any = [];
    const resSourceRepo = await axios.get(sourceRepoURL);
    if (resSourceRepo.status === 200) {
        repos = resSourceRepo.data.filter((repo: any) => !repo.fork && repo.forks > 5);
    }
    res.send({ repos });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});