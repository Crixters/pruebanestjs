import { Controller, Query, Param, Body, Get, Put, Post, Delete, Patch, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from './task-status-enum';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get('/:id')
    getTaskById(@Param('id', ParseUUIDPipe) id: string) : Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }


    @Delete('/id')
    deleteTaskById(@Param('id', ParseUUIDPipe) id: string ) : Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById( @Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus ) : Promise<Task> {
        return this.tasksService.updateTaskById(id, status);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto: GetTasksFilterDto) {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }
    

}
