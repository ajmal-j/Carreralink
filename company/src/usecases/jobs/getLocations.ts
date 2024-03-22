import { IJobRepoType } from "../../database/index.js";

export class GetLocationsUsecase {
    constructor(private readonly JobRepository: IJobRepoType) {}

    async execute() {
        return await this.JobRepository.getOfficeLocationsAndLocations();
    }
}