import { DateFieldFormElement } from "./fields/dateField"
import { NumberFieldFormElement } from "./fields/numberField"
import { ParagraphFieldFormElement } from "./fields/paragraphField"
import { SelectFieldFormElement } from "./fields/SelectField"
import { SeperatorFieldFormElement } from "./fields/SeperatorField"
import { SpaceFieldFormElement } from "./fields/spaceField"
import { SubtitleFieldFormElement } from "./fields/subtitleField"
import { TextAreaFieldFormElement } from "./fields/textAreaField"
import { TextFieldFormElement, } from "./fields/textField"
import { TitleFieldFormElement } from "./fields/titleField"

export type ElementsType =
    "TextField" |
    "TitleField" |
    "SubtitleField" |
    "ParagraphField" |
    "SeperatorField" |
    "SpaceField" |
    "NumberField" |
    "TextAreaField" |
    "DateField" |
    "SelectField"

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
    type: ElementsType,

    construct: (id: string) => FormElementInstance

    designerBtnElement: {
        icon: React.ElementType,
        label: string
    }

    designerComponent: React.FC<{ elementInstance: FormElementInstance }>

    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue: (key: string, value: string) => void;
        isInvalid?: boolean;
        defaultValue?: string;
    }>

    propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>

    validate: (FormElement: FormElementInstance, currentValue: string) => boolean;
}

export type FormElementInstance = {
    id: string
    type: ElementsType
    extraAttributes?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubtitleField: SubtitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeperatorField: SeperatorFieldFormElement,
    SpaceField: SpaceFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField:DateFieldFormElement,
    SelectField:SelectFieldFormElement
}