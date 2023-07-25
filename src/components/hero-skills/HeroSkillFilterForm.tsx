//Generated by WriteToModelfilterform_tsx
"use client";
import { useHeroSkillStore } from "@/hooks/hero-skills/useHeroSkillStore";
import {
  HeroSkillFormikFilter,
  HeroSkillSearchParams,
} from "@/interfaces/HeroSkillInterfaces";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { getFilterValueFromURL, getParamsObject } from "@/utils/utilities";
import { encodeParams } from "@/utils/utils";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";
import { DEFAULT_FILTERS } from "@/utils/constants/HeroSkillConstants";
import LimitSelector from "@/components/form/LimitSelector";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";

const HeroSkillFilterForm: React.FC = () => {
  const { router, query, pathname } = useURL<HeroSkillSearchParams>();

  //SearchParams Variables
  const limit = query["limit"] || DEFAULT_LIMIT;

  const defaultFilters = DEFAULT_FILTERS;
  const initialValues: HeroSkillFormikFilter = getFilterValueFromURL(
    query,
    defaultFilters
  );

  //Zustand stores
  const [setPage, setLastPage, setFetchCount, resetRowSelection] = useHeroSkillStore(
    (state) => [
      state.setPage,
      state.setLastPage,
      state.setFetchCount,
      state.resetRowSelection,
    ]
  );

  const handleFormikSubmit = (
    values: Partial<HeroSkillFormikFilter>,
    formik: FormikHelpers<HeroSkillFormikFilter>
  ) => {
    const params = {
      ...query,
      ...(getParamsObject(values, defaultFilters) as Partial<HeroSkillSearchParams>),
    };

    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
    setFetchCount(true);
    setPage(1);
    setLastPage(1);
    resetRowSelection();
  };

  const handleLimitChange = (value: string) => {
    const params = { ...query, limit: value };
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
    resetRowSelection();
  };

  const renderFormik = (formik: FormikProps<HeroSkillFormikFilter>) => {
    return (
      <Form className="flex gap-4" autoComplete="off">
        {/* Generated by GetFormikFilterQControl */}<FormikControl
  name="q"
  submitOnChange={true}
  placeholder="Filter Hero Skills..."
  type="Text"
/>
        {/* Generated by GetAllFormikFilterControlBySeqModel */}
      </Form>
    );
  };

  return (
    <div className="flex justify-between w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
      >
        {renderFormik}
      </Formik>
      <LimitSelector
        handleLimitChange={handleLimitChange}
        value={limit}
      />
    </div>
  );
};

export default HeroSkillFilterForm;
