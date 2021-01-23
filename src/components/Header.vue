<template>
     <header class="shadow w-screen">
       <nav>
           <nav class="flex items-center justify-between flex-wrap bg-indigo-800 p-6">
               <div class="flex items-center flex-shrink-0 text-white mr-6">
                   <router-link :to="{ name: 'home'}" class="font-semibold text-xl tracking-tight">Coin Market</router-link>
               </div>
               <div class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto">
                   <div class="text-sm lg:flex-grow"></div>
               </div>
           </nav>
       </nav>
    </header> 
</template>