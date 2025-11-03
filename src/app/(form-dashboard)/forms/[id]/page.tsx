import { getFormByid } from "@/actions/form";
import FormBuilder from "@/components/formBuilder";

const FormBuilderPage = async ({ params }: { params: { id: string } }) => {


    const { id } = await params

    const form = await getFormByid(Number(id))

    if (!form) {
        throw new Error("form not found!")
    }

    return <>Forms Details</>
};

export default FormBuilderPage;
