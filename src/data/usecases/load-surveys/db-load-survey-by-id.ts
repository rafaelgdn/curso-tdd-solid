import { LoadSurveyById } from '../../../domain/usecases/load-survey-by-id'
import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/load-survey-by-id'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
