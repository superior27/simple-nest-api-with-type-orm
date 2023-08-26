import { ExecutionContext, NotFoundException, SetMetadata, createParamDecorator } from '@nestjs/common';

// export const User = (...args: string[]) => SetMetadata('user', args);
export const User = createParamDecorator((args: String[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(args);
    if(!request.user)
    {
        throw new NotFoundException('User not found!');
    }

    //Adjust this method
    if(args)
    {
        
        const newUser = args.map((arg) => {
            return {[`${arg}`]: request.user[`${arg}`]};
        });
        return newUser;
    }

    return request.user;
});