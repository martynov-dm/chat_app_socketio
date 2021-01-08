import React from 'react'
import { useColorMode, Box, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { css } from '@emotion/react'

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      css={css`
        &:hover {
          opacity: 0.8;
        }
      `}
      ml='auto'
      textAlign='right'
      py={4}
      mr={7}
    >
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
