/* eslint-disable prettier/prettier */
import { Controller, Get} from "@nestjs/common";
import { AuthUserService } from "./auth_user.service";

@Controller('auth')
export class AuthUserController {
    constructor(private authUserService: AuthUserService) {}

    @Get('/roles/all')
    findAllRoles() {
        return this.authUserService.getRoles();
    }

    @Get('/permissions/all')
    findAllPermissions() {
        return this.authUserService.getPermissions();
    }
}