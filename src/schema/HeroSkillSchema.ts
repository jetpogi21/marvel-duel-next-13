//Generated by WriteToModelschema_ts - ModelSchema.ts
import * as Yup from "yup";

const HeroSkillSchema = Yup.object().shape({
  //Generated by GetAllFieldValidationBySeqModel
  name: Yup.string().required("Name is a required field."),
  type: Yup.string()
    .required("Type is a required field.")
    .oneOf(["Active", "Passive"], "Type is invalid"),
  cost: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue && originalValue !== "" ? value : null
    ),
  description: Yup.string().required("Description is a required field."),
  heroId: Yup.number().required("Hero is a required field."),
});

const HeroSkillArraySchema = Yup.object().shape({
  HeroSkills: Yup.array().of(
    Yup.object().shape({
      //Generated by GetAllArrayFieldValidationBySeqModel
      name: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Name is a required field.")
          : schema.notRequired()
      ),
      type: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema
              .required("Type is a required field.")
              .oneOf(["Active", "Passive"], "Type is invalid")
          : schema.notRequired()
      ),
      cost: Yup.number().nullable(),
      description: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Description is a required field.")
          : schema.notRequired()
      ),
      heroId: Yup.number().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Hero is a required field.")
          : schema.notRequired()
      ),
    })
  ),
});

export { HeroSkillSchema, HeroSkillArraySchema };
