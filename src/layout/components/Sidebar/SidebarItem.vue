<template>
    <div v-if="!item.hidden" class="menu-wrapper">
        <template
                v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <svg-icon v-if="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                              :icon-class="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"></svg-icon>
                    <span v-if="onlyOneChild.meta.title" slot='title'>{{onlyOneChild.meta.title}}</span>
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <svg-icon v-if="item.meta" :icon-class="item.meta && item.meta.icon"></svg-icon>
                <span v-if="item.meta" slot='title'>{{item.meta.title}}</span>
            </template>

            <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :is-nest="true"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"></sidebar-item>
        </el-submenu>
    </div>
</template>

<script lang="ts">
    import path from 'path';

    import {Component, Prop, Vue} from 'vue-property-decorator';

    import AppLink from './Link.vue';
    import {isExternal} from '@/util/ValidateUtils';
    import RouteConfigImpl from '@/router/RouteRecordImpl';
    import {AppState} from '@/store/modules/App';


    @Component({
        name: 'SidebarItem',
        components: {
            AppLink,
        },
    })
    export default class SidebarItem extends Vue {
        @Prop(Object)
        private item!: RouteConfigImpl;

        @Prop(Boolean)
        private isNest!: boolean;

        @Prop(String)
        private basePath!: string;

        private onlyOneChild?: RouteConfigImpl;

        get sidebarOpened() {
            return AppState.sidebar.opened;
        }

        private hasOneShowingChild(children: RouteConfigImpl[] = [], parent: RouteConfigImpl) {
            const showingChildren = children.filter((item: RouteConfigImpl) => {
                if (item.hidden) {
                    return false;
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true;
                }
            });

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }
            // Show parent if there are no child router to display

            if (showingChildren.length === 0) {
                this.onlyOneChild = {...parent, path: '', noShowingChildren: true};
                return true;
            }

            return false;
        }

        private resolvePath(routePath: string) {
            if (isExternal(routePath)) {
                return routePath;
            }
            if (isExternal(this.basePath)) {
                return this.basePath;
            }
            return path.resolve(this.basePath, routePath);
        }
    }

</script>
