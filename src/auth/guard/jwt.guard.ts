import { AuthGuard } from "@nestjs/passport";
class JwtAuthGuard extends AuthGuard("jwt") { 
  constructor() { 
    super(); 
  }
}
export default JwtAuthGuard;