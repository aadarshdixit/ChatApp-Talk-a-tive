import { Badge } from "@chakra-ui/react";
import React from "react";
const UserBadge = ({handleDelete,event})=>{
   return(
    <Badge colorScheme="purple" marginLeft="5px" onClick={handleDelete}>
    {`${event.name} x`}
    </Badge>
   )
}
export default UserBadge;