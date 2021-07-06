import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'example',
    password: 'example',
    database: 'example',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
}