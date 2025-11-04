
import { getFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/formElements";
import FormSubmit from "@/components/formSubmit";

export default async function FormSubmitPage({ params }: { params: { formUrl: string } }) {

    const form = await getFormContentByUrl(params.formUrl)

    if (!form) {
        throw new Error("form not found!")
    }

    const formContent = JSON.parse(form?.content) as FormElementInstance[]

    return <FormSubmit formUrl={params.formUrl} formContent={formContent} />

}
