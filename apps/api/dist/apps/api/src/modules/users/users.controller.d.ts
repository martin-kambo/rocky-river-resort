import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    me(user: any): Promise<any>;
    update(user: any, dto: UpdateUserDto): Promise<any>;
}
