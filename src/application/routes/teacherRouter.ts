import express, { Request, Response } from 'express';
import Teacher from '../../domain/Entities/Teacher';
import TeacherRepository from '../../infrastructure/Repositories/TeacherRepository';

const router = express.Router();
const repository: TeacherRepository = new TeacherRepository();

router.get('/', async (req: Request, res: Response) => {
    res.send({
        page: req.query.page,
        teachers: await repository.getWithPagination()
    });
});

router.get('/:id', async (req: Request, res: Response) => {
    res.send({ teacher: await repository.getById(req.params.id) });
});

router.post('/', async (req: Request, res: Response) => {
    const { name, birthdate } = req.body;
    res.send({
        body: req.body,
        teacher: await repository.insert(new Teacher(name, new Date(birthdate)))
    });
});

router.patch('/:id', async (req: Request, res: Response) => {
    const teacher: Teacher = { ...req.body };
    res.send({ teacher: repository.update(req.params.id, teacher) });
});

router.delete('/:id', async (req: Request, res: Response) => {
    res.send({ teacher: await repository.delete(req.params.id) });
});

export default router;