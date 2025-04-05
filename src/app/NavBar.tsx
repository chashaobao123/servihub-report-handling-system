'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { Navigation } from 'lucide-react';
  

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath)

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem className='space-x-6'/> ServiHub

            <NavigationMenuItem>
                <Link href="/report" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Report
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
                <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Admin
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

        </NavigationMenuList>
        </NavigationMenu>

    </nav>
  )
}

export default NavBar
