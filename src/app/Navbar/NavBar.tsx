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
import { Button } from '@/components/ui/button';
import { logout } from '../admin/actions';
  

const NavBar = ({ isLoggedIn } : { isLoggedIn:boolean }) => {
    const currentPath = usePathname();
    console.log(currentPath)

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem className='space-x-6'>ServiHub</NavigationMenuItem>

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


            {isLoggedIn && (
              <Button type="submit" variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            )}        
    </nav>
  )
}

export default NavBar
