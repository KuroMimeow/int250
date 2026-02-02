<script setup>
defineProps([
    "profileimg",
    "background",
    "name",
    "subheading",
    "followers",
    "following",
    "projects",
    "instargram",
    "tiktok",
    "facebook"
])
</script>

<template>
    <!-- card -->
    <div class="bg-white shadow-lg rounded-2xl min-[320px] overflow-hidden text-center">
        <!-- image -->
        <div class="relative min-h-32 bg-cover bg-center" 
            :style="'background-image: url(' + background + ')'">
            <img :src="profileimg" 
                alt="Profile Image" 
                class="inline-block w-32 h-32 rounded-full object-center object-cover border-6 border-white 
                absolute top-full left-1/2 transform -translate-1/2"
            >
        </div>

        <!-- subheading -->
        <div class="px-6 pt-20 pb-6">
            <h2 class="font-bold text-gray-800 text-2xl mb-2">
                {{ name }}
            </h2>

            <h3 class="text-gray-600 text-lg">
                {{ subheading }}
            </h3>
        </div>
        <!-- social -->
        <div class="flex justify-center gap-4">
            <a v-if="instargram" :href="instargram" target="_blank" class="text-pink-200 hover:text-pink-400 font-medium">
                Instagram
            </a>
            <a v-if="tiktok" :href="tiktok" target="_blank" class="text-gray-200 hover:text-gray-600 font-medium">
                Tiktok
            </a>
            <a v-if="facebook" :href="facebook" target="_blank" class="text-blue-200 hover:text-blue-400 font-medium">
                Facebook
            </a>

        </div>

        <!-- stats -->
        <div class="p-6 border-t border-gray-200 flex item-center justify-center gap-6">
            <!-- follower -->
            <div>
                <h4 class="text-gray-600 text-sm">
                    Followers
                </h4>
                <p class="font-bold text-gray-600 text-2xl">
                    {{ followers }}
                </p>
            </div>
            <!-- following -->
            <div>
                <h4 class="text-gray-600 text-sm">
                    Following
                </h4>
                <p class="font-bold text-gray-600 text-2xl">
                    {{ following }}
                </p>
            </div>
            <!-- project -->
            <div>
                <h4 class="text-gray-600 text-sm">
                    Projects
                </h4>
                <p class="font-bold text-gray-600 text-2xl">
                    {{ projects }}
                </p>
            </div>
        </div>

        
    </div>
     
</template>

<style scoped></style>