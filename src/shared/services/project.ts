import { CurrentPreConfig, MeasuresHistory, ReleaseGoal } from '@customTypes/project';
import api from './api';

class ProjectQuery {
  async getProjectById(organizationId: string, id: string) {
    return api.get(`/organizations/${organizationId}/products/${id}/`);
  }

  async getAllProjects(organizationId: string) {
    return api.get(`/organizations/${organizationId}/repository/`);
  }

  async getProjectMeasuresHistory(organizationId: string, projectId: string) {
    const url = `organizations/${organizationId}/repository/${projectId}/history/measures/`;
    return api.get<MeasuresHistory>(url);
  }

  async getProjectCurrentPreConfig(organizationId: string, projectId: string) {
    const url = `organizations/${organizationId}/products/${projectId}/current/pre-config/`;
    return api.get<CurrentPreConfig>(url);
  }

  async createProjectReleaseGoal(organizationId: string, projectId: string, data: ReleaseGoal) {
    const url = `organizations/${organizationId}/products/${projectId}/create/goal/`
    return api.post(url, data);
  }
}

export const projectQuery = new ProjectQuery();
Object.freeze(projectQuery);
