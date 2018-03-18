<template>
    <div>
        <header>
            <!-- Fixed navbar -->
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <router-link to="/" class="navbar-brand">Quiz</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link to="/quizzes/start" class="nav-link">시작하기</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- Begin page content -->
        <main role="main" class="container">
            <h1 class="mt-5">&nbsp;</h1>
            <p class="lead">
                <router-view></router-view>
            </p>
        </main>
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";

    export default {
    };
</script>

