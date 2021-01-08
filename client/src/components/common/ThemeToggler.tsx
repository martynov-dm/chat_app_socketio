import React from 'react'
import { useColorMode, Box, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box ml='auto' textAlign='right' py={4} mr={7}>
      <IconButton
        aria-label='Toggle day/night'
        icon={
          colorMode === 'light' ? (
            <MoonIcon w='1.5rem' h='1.5rem' variant='ghost' />
          ) : (
            <SunIcon w='1.5rem' h='1.5rem' variant='ghost' />
          )
        }
        onClick={toggleColorMode}
        variant='ghost'
      />
    </Box>
  )
}
