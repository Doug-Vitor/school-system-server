import express, { Request, Response } from 'express';
import Teacher from '../../domain/Entities/Teacher';
import TeacherRepository from '../../infrastructure/Repositories/TeacherRepository';

const router = express.Router();
const repository: TeacherRepository = new TeacherRepository();

router.get('/', async (req: Request, res: Response) => {
    res.send({
        page: req.query.page,
        teachers: await repository.GetWithPagination()
    });
});

router.get('/:id', async (req: Request, res: Response) => {
    res.send({ teacher: await repository.GetById(req.params.id) });
});

router.post('/', async (req: Request, res: Response) => {
    const { name, birthdate } = req.body;
    res.send({
        body: req.body,
        teacher: await repository.Insert(new Teacher(name, new Date(birthdate)))
    });
});

router.patch('/:id', async (req: Request, res: Response) => {
    const teacher: Teacher = { ...req.body };
    res.send({ teacher: repository.Update(req.params.id, teacher) });
});

router.delete('/:id', async (req: Request, res: Response) => {
    res.send({ teacher: await repository.Delete(req.params.id) });
});

export default router;