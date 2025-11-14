
import { getFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/formElements";
import FormSubmit from "@/components/formSubmit";

export default async function FormSubmitPage(props: { params: Promise<{ formUrl: string }> }) {
    const { formUrl } = await props.params;  // <-- FIX

    const form = await getFormContentByUrl(formUrl);

    if (!form) {
        return <div>Form not found</div>;
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];

    return <FormSubmit formUrl={formUrl} formContent={formContent} />;
}
