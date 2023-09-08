//Generated by WriteToModelform_tsx - ModelForm.tsx
"use client";
import {
  CardFormFormikInitialValues,
  CardModel,
  CardSearchParams,
} from "@/interfaces/CardInterfaces";
import {
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  useFormikContext,
} from "formik";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import {
  DEFAULT_FORM_VALUE,
  CONTROL_OPTIONS,
  PRIMARY_KEY,
} from "@/utils/constants/CardConstants";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { sortData } from "@/utils/sort";
import { useCardStore } from "@/hooks/cards/useCardStore";
import { toast } from "@/hooks/use-toast";
import { useCardQuery } from "@/hooks/cards/useCardQuery";
import { convertArrayItemsToStrings } from "@/utils/utils";
import { CardSchema } from "@/schema/CardSchema";
import { Trash } from "lucide-react";
import { useCardDeleteDialog } from "@/hooks/cards/useCardDeleteDialog";
import { CardDeleteDialog } from "@/components/cards/CardDeleteDialog";

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
  const [recordName, setRecordName] = useState(
    prop.data ? prop.data.name : "New Card"
  );
  //Generated by GetAllSimpleOriginalModelState
  //Generated by GetSimpleOriginalModelState - GetSimpleOriginalModelState
  const [originalCardCardKeywords, setOriginalCardCardKeywords] = useState(
    prop.data
      ? prop.data.CardCardKeywords.map((item) => ({
          id: item.id,
          cardKeywordId: item.cardKeywordId,
        }))
      : []
  );
  const ref = useRef<any>(null);

  //Zustand variables
  const { isUpdating, setIsUpdating, hasUpdate, setHasUpdate } = useCardStore(
    (state) => ({
      isUpdating: state.isUpdating,
      setIsUpdating: state.setIsUpdating,
      hasUpdate: state.hasUpdate,
      setHasUpdate: state.setHasUpdate,
    })
  );

  const { setRecordsToDelete } = useCardDeleteDialog((state) => ({
    setRecordsToDelete: state.setRecordsToDelete,
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
  const deckPlaceholder: BasicModel[] = [];
  if (prop.data) {
    //Generated by GetAllRightModelPushPlaceholder
    //Generated by GetRightModelPushPlaceholder - GetRightModelPushPlaceholder
    prop.data.deckId &&
      !deckPlaceholder.some((item) => item.id === prop.data?.deckId) &&
      deckPlaceholder.push({
        id: prop.data.deckId,
        name: prop.data.Deck.name,
      });
  }
  const { data: deckList } = useDeckList({
    placeholderData: deckPlaceholder,
  });

  const { cardMutation, cardQuery } = useCardQuery(slug, {
    enabled: mounted && slug !== "new",
    initialData: prop.data,
  });

  const card = cardQuery.data;

  const initialValues: CardFormFormikInitialValues = {
    ...DEFAULT_FORM_VALUE,
    //Generated by GetAllRightModelDefaultList
    //Generated by GetRightModelDefaultList - GetRightModelDefaultList
    deckId: deckList && deckList.length > 0 ? deckList[0].id : "",
    //Generated by GetAllRelatedModelEmptyArraySimpleOnly
    CardCardKeywords: [], //Generated by GetRelatedModelEmptyArraySimpleOnly - GetRelatedModelEmptyArraySimpleOnly
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
    ref && ref.current && ref.current.focus();
  };

  const handleHasUdpate = () => {
    setHasUpdate(true);
  };

  const handleFormikSubmit = (
    values: CardFormFormikInitialValues,
    formik: FormikHelpers<CardFormFormikInitialValues>
  ) => {
    //@ts-ignore
    const addNew: boolean = values.addNew;

    const goToNewRecord = () => {
      formik.setValues({
        ...DEFAULT_FORM_VALUE,
        //Generated by GetAllRelatedModelEmptyArraySimpleOnly
        CardCardKeywords: [], //Generated by GetRelatedModelEmptyArraySimpleOnly - GetRelatedModelEmptyArraySimpleOnly
      });
      window.history.pushState({}, "", `${window.location.origin}/cards/new`);
      setRecordName("New Card");

      handleFocus();
    };

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

    if (hasUpdate) {
      const payload = {
        ...values,

        //Generated by GetAllRelatedSimplePayloadAssignment
        //Generated by GetRelatedSimplePayloadAssignment - GetRelatedSimplePayloadAssignment
        deletedCardCardKeywords,
        newCardKeywords,
      };

      cardMutation
        .mutateAsync(payload)
        .then((data) => {
          if (addNew) {
            goToNewRecord();
          } else {
            if (data.id) {
              formik.setFieldValue("id", data.id);
            }

            if (data.slug) {
              window.history.pushState(
                {},
                "",
                `${window.location.origin}/cards/${data.slug}`
              );
            }

            setRecordName(values.name);
            //Generated by GetAllUpdateOriginalRelatedSimpleModels
            //Generated by GetUpdateOriginalRelatedSimpleModels - GetUpdateOriginalRelatedSimpleModels
            const newOriginalCardCardKeywords = [
              ...originalCardCardKeywords,
              ...data.CardCardKeywords.map((item) => ({
                id: item.id,
                cardKeywordId: item.cardKeywordId,
              })),
            ].filter(
              (item) => !deletedCardCardKeywords.includes(item.id.toString())
            );

            setOriginalCardCardKeywords(newOriginalCardCardKeywords);
          }

          toast({
            description: "Card list updated successfully",
            variant: "success",
            duration: 2000,
          });
        })
        .catch((err) => console.log(err));
    } else {
      if (addNew) {
        goToNewRecord();
      }
    }
  };

  const renderFormik = (formik: FormikProps<CardFormFormikInitialValues>) => {
    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    return (
      <Form
        className="flex flex-col flex-1 h-full gap-4"
        autoComplete="off"
      >
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="name"
          type="Text"
          label="Name"
          containerClassNames={["w-full"]}
          ref={ref}
          setFocusOnLoad={true}
          setHasUpdate={handleHasUdpate}
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
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetSelectFormControl - Select Form Control */}
        <FormikControl
          name="cost"
          options={CONTROL_OPTIONS.cost}
          label="Cost"
          type="Select"
          showLabel={true}
          allowBlank={false}
          containerClassNames={["w-full"]}
          setHasUpdate={handleHasUdpate}
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
          setHasUpdate={handleHasUdpate}
        />
        <div className="flex gap-4">
          {/* Generated by GetInputFormControl - Input Form Control */}
          <FormikControl
            name="atk"
            type="WholeNumber"
            label="ATK"
            containerClassNames={["max-w-[200px]"]}
            setHasUpdate={handleHasUdpate}
            nullAllowed={true}
          />
          {/* Generated by GetInputFormControl - Input Form Control */}
          <FormikControl
            name="shield"
            type="WholeNumber"
            label="Shield"
            containerClassNames={["max-w-[200px]"]}
            setHasUpdate={handleHasUdpate}
            nullAllowed={true}
          />
        </div>
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="description"
          type="Textarea"
          label="Description"
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetComboBoxFormControl - GetComboBoxFormControl */}
        <FormikControl
          name="deckId"
          options={deckList || []}
          type="ComboBox"
          showLabel={true}
          label="Deck"
          containerClassNames={["max-w-[200px]"]}
          setHasUpdate={handleHasUdpate}
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
          setHasUpdate={handleHasUdpate}
        />
        <div className="flex gap-2 mt-auto">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", true);
              handleSubmitClick(e);
            }}
          >
            Save & Add New
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", false);
              handleSubmitClick(e);
            }}
          >
            Save
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"ghost"}
            onClick={(e) => {
              router.back();
            }}
          >
            Cancel
          </Button>
          {slug !== "new" && (
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={(e) => {
                setRecordsToDelete([formik.values[PRIMARY_KEY].toString()]);
              }}
              className={"ml-auto"}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
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
          { name: recordName, href: "" },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={CardSchema}
      >
        {renderFormik}
      </Formik>
      <CardDeleteDialog
        onSuccess={() => {
          toast({
            description: "Card successfully deleted.",
            variant: "success",
            duration: 4000,
          });
          router.back();
        }}
      />
    </>
  );
};

export default CardForm;
