import React from 'react'
import { useColorMode, Box, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box textAlign='right' py={4} mr={12}>
      <IconButton
        aria-label='Toggle day/night'
        icon={
          colorMode === 'light' ? (
            <MoonIcon variant='ghost' />
          ) : (
            <SunIcon variant='ghost' />
          )
        }
        onClick={toggleColorMode}
        variant='ghost'
      />
    </Box>
  )
}
