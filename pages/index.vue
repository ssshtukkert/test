<template>
    <q-layout class="rubik">
        <q-header elevated>
            <q-toolbar class="toolbar">
            </q-toolbar>
        </q-header>
        <q-page-container style="width: 70%; display: flex; justify-self: center;">
        <q-page class="q-pa-md" style="width: 100%;">
            <nav class="navField">
                <div class="navbar">
                    <div class="navbarItem">
                        <img src="../components/images/favourite_20.png" alt="">
                        <div>Избранное</div>
                    </div>
                    <div class="navbarItem">
                        <img src="../components/images/stock_20.png" alt="">
                        <div>Склад</div>
                    </div>
                    <div class="navbarItem">
                        <img src="../components/images/bag_20.png" alt="">
                        <div>Сделки</div>
                    </div>

                </div>
            </nav>
            <div class="filterSection">
                <div class="types">
                    <q-btn-toggle class="toggle" no-caps v-model="sellType" flat :options="[
                    {label: 'Все типы', value: 'all'},
                    {label: 'Прямые продажи', value: 'directSales'},
                    {label: 'Аукцион', value: 'Auction'}
                ]"/>
                </div>
                <div class="search">
                    <q-input dense outlined v-model="searchText" label="Поиск" class="searchField">
                    <template v-slot:append>
                        <q-icon name="search"/>
                    </template>
                </q-input>
                </div>
                
            </div>
        </q-page>
      </q-page-container>
            
       
    </q-layout>
</template>
<script setup lang="ts">
    import { ref } from 'vue';

    const sellType  = ref<string>('all');
    const searchText = ref<string>('');
    

</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
    .toolbar {
        width: 100vw;
        height: 70px;
        background-color: #E0E3EE;
    }
    .navField{
        width: 100%;
    }
    .navbar{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-end;
        column-gap: 30px;
        color: #2D3B87;
    }
    .navbarItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .filterSection{
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        align-items: center;
    }
    .toggle{
        background-color: #F4F5F9;
        color: #969DC3;
    }
    .rubik {
        font-family: "Rubik", serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    }
    .searchField{
        display: flex;
        width: 200px;
    }
    .types{
        display: flex;
        width: 50%;
        justify-content: start;
    }
    .search{
        display: flex;
        width: 50%;
        justify-content: end;
    }
    
</style>