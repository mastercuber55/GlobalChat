<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'

// import { SidebarTrigger } from './ui/sidebar';

</script>

<template>
    <Card class="bg-sidebar text-sidebar-foreground border-b border-sidebar-border h-11 px-4 flex items-center">
        <SidebarTrigger/>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem class="px-3 text-sm font-semibold opacity-50 select-none">
                    Global Chat
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
      </Card>
</template>