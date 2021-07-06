import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor( @InjectRepository(TaskRepository) private taskRepository: TaskRepository ){}

    async getTaskById(id: string){
        const found = await this.taskRepository.findOne({id: id});

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    async createTask( createTaskDto: CreateTaskDto ) : Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async deleteTaskById(id: string) : Promise<void> {
        const result = await this.taskRepository.softDelete({id: id});
        console.log(result);
    }

    async updateTaskById(id: string, status: TaskStatus): Promise<Task>{
       const task = await this.getTaskById(id);
       task.status = status;
       await task.save();
       return task;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto)  {
        const {status, search} = filterDto;

        if(status){
            return this.taskRepository.find({ status });
        } else {
            return this.taskRepository.find({
                where: [
                    { title: Like(`%${search}%`) },
                    { description: Like(`%${search}%`) }
                ]
            });
        }
    }

    getAllTasks(){
        return this.taskRepository.find();
    }

    /*private tasks : Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    deleteTaskById(id: string): void {
        const _ = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskById(id: string, status: TaskStatus){
        const task = this.getTaskById( id );
        task.status = status 
        return task
    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    getTasksWithFilters( filterDto: GetTasksFilterDto ): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.title.includes(search));
        }

        return tasks;
    }*/

}
