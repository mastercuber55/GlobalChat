<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { Icon } from "@iconify/vue"

// import { SidebarTrigger } from './ui/sidebar';

</script>

<template>
    <Card
        class="bg-sidebar text-sidebar-foreground border-b border-sidebar-border h-11 px-4 flex items-center justify-between">

        <!-- LEFT SIDE -->
        <div class="flex items-center gap-2">
            <!-- <SidebarTrigger /> -->

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem class="px-3 text-sm font-semibold opacity-50 select-none">
                        Global Chat
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

        <!-- RIGHT SIDE LINKS (shadcn way) -->
        <NavigationMenu>
            <NavigationMenuList class="flex items-center gap-3">

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <a href="https://github.com/mastercuber55/GlobalChat" target="_blank"
                            class="text-lg opacity-80 hover:opacity-100 transition">
                            <Icon icon="mdi:github" />
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <a href="https://www.youtube.com/@mastercoder55" target="_blank"
                            class="text-lg opacity-80 hover:opacity-100 transition">
                            <Icon icon="mdi:youtube" />
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <a href="https://discord.gg/7zvpWnE7QV" target="_blank"
                            class="text-lg opacity-80 hover:opacity-100 transition">
                            <Icon icon="ic:baseline-discord" />
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>

    </Card>
</template>