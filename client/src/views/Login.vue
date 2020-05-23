<template>
    <div class="container">
        <form action="#">
            <h2>Страница авторизации</h2>
            
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp"
                >
                <small id="emailHelp" class="form-text text-muted">
                </small>
            </div>
            
            <div class="form-group">
                <label for="exampleInputPassword1">Пароль</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
                <small id="passwordHelp" class="form-text text-muted">
                </small>
            </div>
            
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
            </div>
            
            <div class="row">
                <div class="col-lg-2 col-xl-2 col-md-3">
                    <button type="submit" class="btn btn-success">Войти</button>
                </div>
                
                <div class="col-lg-3 col-xl-3 col-md-4 d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">Регистрация</button>
                </div>
            </div>
           
        </form>
    </div>
</template>

<script>
export default {

}
</script>