import { PropertyStatus } from "@/types/propertiesStatus";
import { Badge } from "./ui/badge";

const statusLabel = {
    "for-sale": "For Sale",
    withdrawn: "Withdrawn",
    draft: "Draft",
    sold: "Sold",
  };

const variant: {
    [key: string]: "primary" | "destructive" | "secondary" | "success";
  } = {
    "for-sale": "primary",
    withdrawn: "destructive",
    draft: "secondary",
    sold: "success",
  };

export default function PropertyStatusBadge ({
status,
className
}:{
    status:PropertyStatus
    className?:string
}) {
    const label = statusLabel[status]
    return(
        <Badge 
        className={className}
        variant={variant[status]}>
        {label}
        </Badge>
    )
}