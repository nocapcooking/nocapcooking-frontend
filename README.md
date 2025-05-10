# NoCapCooking-frontend

**NoCapCooking-frontend** to frontendowa aplikacja internetowa stworzona w Angularze (CLI v19.2.4), która wspiera użytkowników w planowaniu i przygotowywaniu posiłków. Projekt jest częścią systemu **NoCapCooking** — platformy kulinarnej umożliwiającej przeglądanie przepisów.

## Wymagania

- Node.js (zalecana wersja: LTS)
- Angular CLI w wersji co najmniej 19.2.4

## Uruchamianie serwera deweloperskiego

Aby uruchomić lokalny serwer deweloperski, wykonaj polecenie:

```
ng serve
```
Następnie otwórz przeglądarkę i przejdź pod adres ```http://localhost:4200```. Aplikacja automatycznie odświeży się po każdej zmianie w plikach źródłowych.
Tworzenie komponentów i innych elementów

Angular CLI umożliwia szybkie generowanie komponentów, usług, dyrektyw i innych elementów projektu. Przykładowo, aby wygenerować nowy komponent:

```ng generate component nazwa-komponentu```

Aby zobaczyć wszystkie dostępne schematy:

```ng generate --help```

## Budowanie aplikacji

Aby zbudować aplikację (np. do wdrożenia na serwer produkcyjny), użyj:

```ng build```

Wynikowa aplikacja znajdzie się w katalogu dist/. Domyślnie budowana jest wersja zoptymalizowana pod kątem wydajności i szybkości.

## Uruchamianie testów jednostkowych

Aby uruchomić testy jednostkowe z wykorzystaniem Karma:

```ng test```

## Uruchamianie testów end-to-end

Aby uruchomić testy end-to-end (E2E), użyj:

```ng e2e```

> Uwaga: Angular CLI nie dostarcza domyślnie frameworka E2E — możesz wybrać i skonfigurować taki, który odpowiada potrzebom projektu (np. Cypress, Playwright).

## Struktura projektu

```src/app``` – główny katalog aplikacji (komponenty, serwisy, moduły)

```src/assets``` – pliki statyczne (np. obrazy, style)

```src/environments``` – konfiguracje środowiskowe (np. development, produkcja)
