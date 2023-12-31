//Generated by WriteToModelschema_ts - ModelSchema.ts
import * as Yup from "yup";

const LockedDeckSchema = Yup.object().shape({
  //Generated by GetAllFieldValidationBySeqModel
name: Yup.string().required("Name is a required field."),
  //Generated by GetAllRelatedLeftArrayValidation
//Generated by GetRelatedLeftArrayValidation - GetRelatedLeftArrayValidation
LockedDeckCards: Yup.array().of(
    Yup.object().shape({
      //Generated by GetAllArrayFieldValidationBySeqModel
cardId: Yup.number().when("touched", ([touched], schema) => touched ? schema.required("Card is a required field.") : schema.notRequired())
    })
  ),
});

const LockedDeckArraySchema = Yup.object().shape({
  LockedDecks: Yup.array().of(
    Yup.object().shape({
     //Generated by GetAllArrayFieldValidationBySeqModel
name: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("Name is a required field.") : schema.notRequired())
    })
  ),
});

export { LockedDeckSchema, LockedDeckArraySchema };
