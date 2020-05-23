<template>
    <div class="container">
        <form action="#">
            <h2>Страница регистрации</h2>
    
            <div class="form-group">
                <label for="exampleInputPassword1">Имя</label>
                <input type="text" class="form-control" id="exampleInputName">
                <small id="nameHelp" class="form-text text-muted">
                </small>
            </div>
            
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
            
            <button type="submit" class="btn btn-success">Регистрация</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>