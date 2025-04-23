import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-property";

export default function NewProperty() {
    return (
        <div>  
            <Breadcrumbs items={[
                {
                    label: "Dashboard",
                    href: "/admin-dashboard"
                },
                {
                    label: "New Property",
                    href: "/admin-dashboard/new"
                }
            ]}></Breadcrumbs>

            <Card className="mt-5 bg-gray-200">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">
                    New Property
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <NewPropertyForm/>
                </CardContent>
            </Card>
        </div>
    );
}