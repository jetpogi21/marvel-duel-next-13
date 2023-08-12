//Generated by WriteToModelform_tsx - ModelForm.tsx
"use client";
import {
  CardFormFormikInitialValues,
  CardModel,
  CardSearchParams,
} from "@/interfaces/CardInterfaces";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
  DEFAULT_FORM_VALUE,
  CONTROL_OPTIONS,
} from "@/utils/constants/CardConstants";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useCardStore } from "@/hooks/cards/useCardStore";
import { toast } from "@/hooks/use-toast";
import { useCardQuery } from "@/hooks/cards/useCardQuery";
import { convertArrayItemsToStrings } from "@/utils/utils";
//Generated by GetAllModelFormRequiredListImport
//Generated by GetModelFormRequiredListImport - GetModelFormRequiredListImport
import useCardKeywordList from "@/hooks/card-keywords/useCardKeywordList";
//Generated by GetAllModelFormRequiredRightModelListImport
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useDeckList from "@/hooks/decks/useDeckList";

interface CardFormProps {
  data: CardModel | null;
  slug: string;
}

const CardForm: React.FC<CardFormProps> = (prop) => {
  const { slug } = prop;
  const { router, query, pathname } = useURL<CardSearchParams>();

  //Local states
  const [mounted, setMounted] = useState(false);
  const ref = useRef<any>(null);

  //Zustand variables
  const { isUpdating, setIsUpdating } = useCardStore((state) => ({
    isUpdating: state.isUpdating,
    setIsUpdating: state.setIsUpdating,
  }));

  //Tanstack queries
  //Generated by GetAllRelatedListFromRelatedModel
  //Generated by GetAllRelatedListFromModel - GetRelatedListFromRelatedModel
  const { data: cardKeywordList } = useCardKeywordList({
    placeholderData: prop.data
      ? prop.data.CardCardKeywords.map((item) => ({
          id: item.cardKeywordId,
          name: item.CardKeyword.name,
        }))
      : [],
  });
  //Generated by GetAllRelatedRightModelListFromRelatedModel
  //Generated by GetRelatedRightModelListFromRelatedModel - GetRelatedRightModelListFromRelatedModel
  const { data: deckList } = useDeckList({
    placeholderData: prop.data
      ? [
          {
            id: prop.data.deckId,
            name: prop.data.Deck.name,
          },
        ]
      : [],
  });

  const { cardMutation, cardQuery } = useCardQuery(slug, {
    enabled: mounted,
    initialData: prop.data,
  });

  const card = cardQuery.data;

  //Generated by GetAllOriginalSimpleRelatedModel
  //Generated by GetOriginalSimpleRelatedModel - GetOriginalSimpleRelatedModel
  let originalCardCardKeywords = card
    ? card.CardCardKeywords.map((item) => ({
        id: item.id,
        cardKeywordId: item.cardKeywordId,
      }))
    : [];

  //The related mode is generated by GetAllRelatedModelEmptyArray
  const initialValues: CardFormFormikInitialValues = {
    ...DEFAULT_FORM_VALUE,
    //Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
    CardCardKeywords: [],
  };

  if (card) {
    for (const key in initialValues) {
      if (card.hasOwnProperty(key) && initialValues.hasOwnProperty(key)) {
        //@ts-ignore
        //prettier-ignore
        initialValues[key] = card[key] === null ? "" : card[key];
      }
    }

    //Generated by GetAllRelatedSimpleModelMapToInitialValue
    //Generated by GetRelatedSimpleModelMapToInitialValue - GetRelatedSimpleModelMapToInitialValue
    initialValues.CardCardKeywords = card.CardCardKeywords.map((item, index) =>
      item.cardKeywordId.toString()
    );
  }

  const handleFocus = () => {
    ref && ref.current.focus();
  };

  const handleFormikSubmit = (
    values: CardFormFormikInitialValues,
    formik: FormikHelpers<CardFormFormikInitialValues>
  ) => {
    //Generated by GetAllAddedAndDeletedSimpleRelationship
    //Generated by GetAddedAndDeletedSimpleRelationship - GetAddedAndDeletedSimpleRelationship
    const deletedCardCardKeywords =
      originalCardCardKeywords
        .filter(
          (item) =>
            !convertArrayItemsToStrings(values.CardCardKeywords).includes(
              item.cardKeywordId.toString()
            )
        )
        .map((item) => item.id.toString()) || [];

    const newCardKeywords = convertArrayItemsToStrings(
      values.CardCardKeywords
    ).filter(
      (item) =>
        !originalCardCardKeywords
          .map((cardCardKeyword) => cardCardKeyword.cardKeywordId.toString())
          .includes(item)
    );

    const payload = {
      ...values,

      //Generated by GetAllRelatedSimplePayloadAssignment
      //Generated by GetRelatedSimplePayloadAssignment - GetRelatedSimplePayloadAssignment
      deletedCardCardKeywords,
      newCardKeywords,
    };

    cardMutation.mutateAsync(payload).then((data) => {
      //Generated by GetAllUpdateOriginalRelatedSimpleModels
      //Generated by GetUpdateOriginalRelatedSimpleModels - GetUpdateOriginalRelatedSimpleModels
      originalCardCardKeywords = [
        ...originalCardCardKeywords,
        ...data.CardCardKeywords.map((item) => ({
          id: item.id,
          cardKeywordId: item.cardKeywordId,
        })),
      ];

      originalCardCardKeywords = originalCardCardKeywords.filter(
        (item) => !deletedCardCardKeywords.includes(item.id.toString())
      );

      toast({
        description: "Card list updated successfully",
        variant: "success",
        duration: 2000,
      });
    });
  };

  const renderFormik = (formik: FormikProps<CardFormFormikInitialValues>) => {
    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    return (
      <Form
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="name"
          type="Text"
          label="Name"
          containerClassNames={["w-full"]}
          inputRef={ref}
          setFocusOnLoad={true}
        />
        {/* Generated by GetSelectFormControl - Select Form Control */}
        <FormikControl
          name="type"
          options={CONTROL_OPTIONS.type}
          label="Type"
          type="Select"
          showLabel={true}
          allowBlank={false}
          containerClassNames={["w-full"]}
        />
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="cost"
          type="WholeNumber"
          label="Cost"
          containerClassNames={["max-w-[200px]"]}
        />
        {/* Generated by GetSelectFormControl - Select Form Control */}
        <FormikControl
          name="battleStyle"
          options={CONTROL_OPTIONS.battleStyle}
          label="Battle Style"
          type="Select"
          showLabel={true}
          allowBlank={true}
          containerClassNames={["max-w-[200px]"]}
        />
        <div className="flex gap-4">
          {/* Generated by GetInputFormControl - Input Form Control */}
          <FormikControl
            name="atk"
            type="WholeNumber"
            label="ATK"
            containerClassNames={["max-w-[200px]"]}
          />
          {/* Generated by GetInputFormControl - Input Form Control */}
          <FormikControl
            name="shield"
            type="WholeNumber"
            label="Shield"
            containerClassNames={["max-w-[200px]"]}
          />
        </div>
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="description"
          type="Textarea"
          label="Description"
        />
        {/* Generated by GetComboBoxFormControl - GetComboBoxFormControl */}
        <FormikControl
          name="deckId"
          options={deckList || []}
          type="ComboBox"
          showLabel={true}
          label="Deck"
          containerClassNames={["max-w-[200px]"]}
        />
        {/* Generated by GetAllRelatedSimpleFacetedControl */}
        {/* Generated by GetRelatedSimpleFacetedControl - GetRelatedSimpleFacetedControl */}
        <FormikControl
          name="CardCardKeywords"
          options={cardKeywordList || []}
          type="FacetedControl"
          label="Card Keywords"
          containerClassNames={["max-w-[200px]"]}
          limit={10}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
          >
            Save & Add New
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={handleSubmitClick}
          >
            Save
          </Button>
        </div>
      </Form>
    );
  };

  useEffect(() => {
    setMounted(true);
    handleFocus();
  }, []);

  return (
    <>
      <Breadcrumb
        links={[
          { name: "Cards", href: "/cards" },
          { name: card ? card.name : "New Card", href: "" },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {renderFormik}
      </Formik>
    </>
  );
};

export default CardForm;
