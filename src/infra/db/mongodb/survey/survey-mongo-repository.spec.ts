import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

import { Collection } from 'mongodb'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  const makeFakeSurvey = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  })

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeSurvey())
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
  test('Should load all surveys on success', async () => {
    await surveyCollection.insertMany([makeFakeSurvey(), makeFakeSurvey()])
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys.length).toBe(2)
    expect(surveys[0].question).toBe('any_question')
  })
  test('Should load all surveys on success', async () => {
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys.length).toBe(0)
  })
})
