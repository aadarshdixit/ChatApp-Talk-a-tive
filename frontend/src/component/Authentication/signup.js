import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React from 'react'

const Signup = ()=>{
    <VStack spacing="5px">
    
    <FormControl isRequired id='first-name'>
    <FormLabel>Fisrt Name</FormLabel>
    <Input placeholder='First name'/>
  </FormControl>
    
    </VStack>
}
export default Signup;