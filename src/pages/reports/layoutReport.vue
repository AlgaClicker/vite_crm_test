<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="nav nav-pills nav-sm"  id="myTab" role="tablist">
        <li class="nav-item">
            <router-link  class="nav-link" active-class="active" exact-active-class="exact-active"  :data-toggle="'tab'" to="/cms/reports/index">
                <font-awesome-icon :icon="['fas', 'bars']" size="sm"/>
                Индекс
            </router-link> 
        </li>
        <li class="nav-item">
            <router-link  class="nav-link" active-class="active" exact-active-class="exact-active"  :data-toggle="'tab'" to="/cms/reports/active/accounts">
                <font-awesome-icon :icon="['fas', 'bars']" size="sm"/>
                Активность 
            </router-link> 
        </li>
        <li class="nav-item">
            <router-link  class="nav-link" active-class="active" exact-active-class="exact-active"  :data-toggle="'tab'" to="/cms/reports/active/accounts">
                <font-awesome-icon :icon="['fas', 'bars']" size="sm"/>
                отчет 1 
            </router-link> 
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
        </li>
        </ul>
    </nav>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>