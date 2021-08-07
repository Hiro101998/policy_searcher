<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>大学ポリシー検索ツール</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Bootstrap Icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Google fonts-->
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <!-- SimpleLightbox plugin CSS-->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <body id="page-top">
         <!-- Navigation-->
         <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#page-top">大学ポリシー検索ツール</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#policy">ポリシーとは</a></li>
                        <li class="nav-item"><a class="nav-link" href="#merit">ポリシーを知っておくメリット</a></li>
                        <li class="nav-item"><a class="nav-link" href="#page-top">トップ画面に戻る</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    <header class="masthead">
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                        <h1 class="text-white font-weight-bold">大学ポリシー検索ツール</h1>
                        <hr class="divider" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                        <p class="text-white-75 mb-5">自分が本当に進学したい大学を見つけてください。<br>後悔しない大学選びを。</p>
                        @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a class="btn btn-primary btn-xl" href="{{ url('/home#/home') }}" >ログイン</a>
                    @else
                        <a  class="btn btn-primary btn-xl"href="{{ route('login') }}">ログイン</a>

                        @if (Route::has('register'))
                            <a class="btn btn-primary btn-xl" href="{{ route('register') }}">新規登録</a>
                        @endif
                    @endauth
                </div>
            @endif
                    </div>
                </div>
            </div>
        </header>
        <!-- Policyとは-->
        <div id="policy">
        <section class="page-section">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0">大学のポリシーとは？？</h2>
                <p class="text-black-75 mb-12 text-center">各大学の各学部ごとに、以下の３つのポリシーが定められています。<br>※以下、文部科学省の『三つのポリシーの策定と運用に係るガイドライン』より抜粋。</p> 
                <hr class="divider" />
                <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-4 col-md-12 text-center">
                        <div class="mt-5">
                        <div class="mb-3"><i class="bi bi-award fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">ディプロマポリシー</h3>
                            <p class="text-muted mb-0">各大学がその教育理念を踏まえ，どのような力を身に付ければ学位を授与するのかを定める基本的な方針であり，学生の学修成果の目標ともなるもの。</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 text-center">
                        <div class="mt-5">
                            <div class="mb-3"><i class="bi bi-clipboard-check fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">カリキュラムポリシー</h3>
                            <p class="text-muted mb-0">ディプロマ・ポリシーの達成のために，どのような教育課程を編成し，どのような教育内容・方法を実施するのかを定める基本的な方針。</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 text-center">
                        <div class="mt-5">
                            <div class="mb-3"><i class="bi bi-pencil fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">アドミッションポリシー</h3>
                            <p class="text-muted mb-0">各大学が，当該大学・学部等の教育理念，ディプロマ・ポリシー，カリキュラム・ポリシーに基づく教育内容等を踏まえ，入学者を受け入れるための基本的な方針であり，受け入れる学生に求める学習成果を示すもの。</p>
                        </div>
                    </div>
                   
                </div>
            </div>
            </div>  
        </section>
        <!-- ポリシーを知っておくメリット -->
        <div id="merit">
        <section id="merit">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0">ポリシーを知っておくメリット</h2>
                <p class="text-black-75 mb-12 text-center">当アプリケーションを使用することで、各大学ごとにポリシーを簡単に比較することができます。</p> 
                <hr class="divider" />
                <div class="row gx-4 gx-lg-5">
                    <div class="text-center">
                        <div class="mt-5">
                            <h4 class="mb-0">☆初等中等教育段階におけるどのような学習成果を求めているのか，入学希望者が入学までに何を身に付けなければならないのかが分かる。</h4>
                        </div>
                        <div class="mt-5">
                            <h4 class="mb-0">☆入学後の学修方法・学修過程や身に付けることができる力を入学前に把握できる。</h4>
                        </div>
                        <div class="mt-5">
                            <h4 class="mb-0">☆卒業までに求められる学修成果についてあらかじめ見通しを持つことができる。</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </section>

       
        <footer class="bg-light py-5 page-section">
            <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 大学ポリシー検索ツール  </div></div>
        </footer>
        <!-- Bootstrap core JS-->
        <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script> -->
        <!-- SimpleLightbox plugin JS-->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.js"></script> -->
        <!-- Core theme JS-->
        <!-- <script src="js/scripts.js"></script> -->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- * *                               SB Forms JS                               * *-->
        <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script> -->
           

            

           
    </body>
</html>
