import express, { Request, Response } from 'express';
import Teacher from '../../domain/Entities/Teacher';
import TeacherRepository from '../../infrastructure/Repositories/TeacherRepository';

const router = express.Router();
const repository: TeacherRepository = new TeacherRepository();

router.get('/', (req: Request, res: Response) => {
    res.send({
        page: req.query.page,
        teacher: new Teacher('Fulano', new Date(1990, 12, 5), "1")
    });
});

router.get('/:id', (req: Request, res: Response) => {
    res.send({
        id: req.params.id,
        teacher: new Teacher('Fulano', new Date(1990, 12, 5), "1")
    });
});

router.post('/', async (req: Request, res: Response) => {
    res.send({
        body: req.body,
        teacher: new Teacher('Fulano', new Date(1990, 12, 5), 1)
    }); 
});

router.put('/:id', (req: Request, res: Response) => {
    res.send({
        id: req.params.id,
        body: req.body,
        teacher: new Teacher('Fulano', new Date(1990, 12, 5), "1")
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    res.send({
        id: req.params.id,
        teacher: new Teacher('Fulano', new Date(1990, 12, 5), "1")
    });
});

export default router;