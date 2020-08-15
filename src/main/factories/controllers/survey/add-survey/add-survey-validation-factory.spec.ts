import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { ValidationComposite } from '../../../../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../../presentation/helpers/validators/validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
