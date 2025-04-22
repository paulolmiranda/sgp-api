import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ProjectService } from './project.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { id } = context.switchToHttp().getRequest().credential;
    const { projectId } = context.switchToHttp().getRequest().params;
    return this.projectService.isOwner(projectId, id);
  }
}
