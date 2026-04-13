# Kinal Sports - Authentication Service

> **Nota**: Este proyecto fue desarrollado con fines didácticos como parte del curso de arquitectura de microservicios IN6AM. Forma parte de una serie de servicios independientes que conforman la aplicación completa "Kinal Sports".

## Descripción

Microservicio de autenticación y gestión de usuarios para la plataforma Kinal Sports. Este servicio maneja el registro, inicio de sesión, verificación de correo electrónico, recuperación de contraseñas y gestión de perfiles de usuario.

Implementa arquitectura limpia (Clean Architecture) con capas bien definidas: API, Application, Domain y Persistence.

## Funcionalidades Principales

### Autenticación y Autorización
- Registro de usuarios con validación de datos
- Inicio de sesión con JWT
- Verificación de correo electrónico
- Reenvío de correos de verificación
- Recuperación de contraseña (Forgot Password)
- Restablecimiento de contraseña
- Protección de rutas con JWT Bearer Authentication

### Gestión de Usuarios
- Perfiles de usuario con foto (Cloudinary)
- Consulta de perfil autenticado
- Consulta de perfil por ID
- Sistema de roles y permisos

### Seguridad
- Hashing de contraseñas con Argon2
- Tokens JWT con expiración configurable
- Rate limiting por endpoint
- Middleware de manejo global de excepciones
- Validación de datos con FluentValidation
- Headers de seguridad (HSTS, XSS Protection, etc.)

### Notificaciones
- Envío de correos con SMTP (Gmail)
- Plantillas HTML personalizadas
- Logging detallado de protocolo SMTP
- Manejo de errores de envío con fallback

### Observabilidad
- Logging estructurado con Serilog
- Logs en consola y archivos con rotación diaria
- Health check endpoint
- Documentación Swagger/OpenAPI

## Tecnologías Utilizadas

### Backend
- **Framework**: ASP.NET Core 8.0
- **Lenguaje**: C# (.NET 8)
- **Arquitectura**: Clean Architecture (4 capas)

### Base de Datos
- **ORM**: Entity Framework Core 9.0
- **Base de Datos**: PostgreSQL
- **Migraciones**: EF Core Migrations
- **Naming Convention**: Snake case (EFCore.NamingConventions)

### Seguridad
- **JWT**: System.IdentityModel.Tokens.Jwt
- **Hashing**: Argon2 (Konscious.Security.Cryptography.Argon2)
- **Authentication**: Microsoft.AspNetCore.Authentication.JwtBearer
- **Headers**: NetEscapades.AspNetCore.SecurityHeaders

### Servicios Externos
- **Email**: MailKit (SMTP)
- **Almacenamiento**: Cloudinary (imágenes de perfil)

### Validación y Logging
- **Validación**: FluentValidation
- **Logging**: Serilog.AspNetCore
- **Documentación**: Swashbuckle.AspNetCore (Swagger)

## Endpoints API

Base URL: `http://localhost:5296/api/v1`

### Autenticación (`/auth`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/auth/register` | Registrar nuevo usuario | No |
| `POST` | `/auth/login` | Iniciar sesión | No |
| `POST` | `/auth/verify-email` | Verificar correo electrónico | No |
| `POST` | `/auth/resend-verification` | Reenviar correo de verificación | No |
| `POST` | `/auth/forgot-password` | Solicitar recuperación de contraseña | No |
| `POST` | `/auth/reset-password` | Restablecer contraseña | No |
| `GET` | `/auth/profile` | Obtener perfil autenticado | Sí |
| `POST` | `/auth/profile/by-id` | Obtener perfil por ID | No |

### Salud (`/health`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/health` | Estado del servicio | No |

### Modelos de Request

#### Registro (`/auth/register`)
```json
{
  "email": "usuario@ejemplo.com",
  "username": "usuario123",
  "password": "Contraseña123!",
  "confirmPassword": "Contraseña123!",
  "firstName": "Juan",
  "lastName": "Pérez",
  "profilePicture": "archivo.jpg"
}
```

#### Login (`/auth/login`)
```json
{
  "emailOrUsername": "usuario@ejemplo.com",
  "password": "Contraseña123!"
}
```

#### Verificación de Email (`/auth/verify-email`)
```json
{
  "token": "token-de-verificacion"
}
```

#### Recuperación de Contraseña (`/auth/forgot-password`)
```json
{
  "email": "usuario@ejemplo.com"
}
```

#### Restablecimiento de Contraseña (`/auth/reset-password`)
```json
{
  "token": "token-de-recuperacion",
  "password": "NuevaContraseña123!",
  "confirmPassword": "NuevaContraseña123!"
}
```

## 📁 Estructura del Proyecto

```
auth-service/
├── src/
│   ├── AuthService.Api/              # Capa de presentación
│   │   ├── Controllers/              # Controladores REST
│   │   ├── Extensions/               # Configuraciones y extensiones
│   │   ├── Middlewares/              # Middlewares personalizados
│   │   ├── ModelBinders/             # Model binders personalizados
│   │   ├── Models/                   # Modelos de API
│   │   ├── keys/                     # Claves de encriptación
│   │   ├── logs/                     # Archivos de log
│   │   ├── appsettings.json          # Configuración principal
│   │   ├── appsettings.Development.json  # Configuración desarrollo
│   │   ├── AuthService.Api.csproj    # Archivo de proyecto
│   │   ├── AuthService.Api.http      # Archivo de pruebas HTTP
│   │   └── Program.cs                # Punto de entrada
│   │
│   ├── AuthService.Application/      # Capa de aplicación
│   │   ├── DTOs/                     # Data Transfer Objects
│   │   │   └── Email/                # DTOs de email
│   │   ├── Exceptions/               # Excepciones personalizadas
│   │   ├── Extensions/               # Extensiones y utilidades
│   │   ├── Interfaces/               # Interfaces de servicios
│   │   ├── Services/                 # Implementación de servicios
│   │   ├── Validators/               # Validadores FluentValidation
│   │   └── AuthService.Application.csproj
│   │
│   ├── AuthService.Domain/           # Capa de dominio
│   │   ├── Constants/                # Constantes del dominio
│   │   ├── Entities/                 # Entidades del dominio
│   │   ├── Enums/                    # Enumeraciones
│   │   ├── Interfaces/               # Interfaces de repositorios
│   │   └── AuthService.Domain.csproj
│   │
│   └── AuthService.Persistence/      # Capa de persistencia
│       ├── Data/                     # DbContext y configuraciones
│       ├── Migrations/               # Migraciones de EF Core
│       ├── Repositories/             # Implementación de repositorios
│       └── AuthService.Persistence.csproj
│
├── AuthService.sln                   # Solución de Visual Studio
├── global.json                       # Versión de .NET
├── .gitignore                        # Archivos ignorados por git
├── LICENSE                           # Licencia MIT
└── README.md                         # Este archivo
```

## Configuración

### Requisitos Previos
- .NET 8.0 SDK o superior
- PostgreSQL 13 o superior
- Cuenta de Cloudinary (opcional, para imágenes de perfil)
- Cuenta de Gmail con App Password (para envío de emails)

### Variables de Configuración

Crear `appsettings.Development.json` en `src/AuthService.Api/`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=kinal_sports_users;Username=usuario;Password=password;Port=5432"
  },
  "CloudinarySettings": {
    "CloudName": "tu-cloud-name",
    "ApiKey": "tu-api-key",
    "ApiSecret": "tu-api-secret",
    "Folder": "kinal-sports/profiles",
    "DefaultAvatarPath": "avatar-default.png"
  },
  "SmtpSettings": {
    "Host": "smtp.gmail.com",
    "Port": "465",
    "EnableSsl": "true",
    "Username": "tu-email@gmail.com",
    "Password": "tu-app-password",
    "FromEmail": "tu-email@gmail.com",
    "FromName": "Kinal Sports Soporte",
    "Enabled": true,
    "Timeout": 30000,
    "UseImplicitSsl": true,
    "IgnoreCertificateErrors": false,
    "ProtocolLogPath": "logs/smtp-protocol.log"
  },
  "AppSettings": {
    "FrontendUrl": "http://localhost:5173"
  },
  "JwtSettings": {
    "SecretKey": "tu-clave-secreta-muy-segura-minimo-32-caracteres",
    "Issuer": "KinalSports",
    "Audience": "KinalSports",
    "ExpirationMinutes": 60
  }
}
```

### Instalación y Ejecución

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd auth-service
```

2. **Restaurar dependencias**
```bash
dotnet restore
```

3. **Aplicar migraciones a la base de datos**
```bash
cd src/AuthService.Api
dotnet ef database update
```

4. **Ejecutar el servicio**
```bash
dotnet run
```

El servicio estará disponible en: `http://localhost:5296`

### Documentación Swagger/OpenAPI

La documentación interactiva de la API está disponible en:

- **Interfaz Swagger UI**: `http://localhost:5296/swagger`
- **Especificación JSON**: `http://localhost:5296/swagger/v1/swagger.json`

Accede a Swagger para explorar todos los endpoints, ver ejemplos de request/response y probar la API directamente desde el navegador.

## Seguridad

### Rate Limiting
- **AuthPolicy**: 5 solicitudes / 1 minuto (registro, login)
- **ApiPolicy**: 20 solicitudes / 1 minuto (endpoints generales)

### Headers de Seguridad
- HSTS (HTTP Strict Transport Security)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: no-referrer

### Almacenamiento de Claves
- Las claves de encriptación se almacenan en `keys/`
- Nunca se deben commitear al repositorio
- Configurar en `.gitignore` apropiadamente

### JWT
- Tokens con tiempo de expiración configurable
- Validación de issuer y audience
- Almacenamiento seguro de claves

## Logging

Los logs se almacenan en:
- **Consola**: Formato simplificado para desarrollo
- **Archivos**: `logs/auth-service-YYYY-MM-DD.txt` (rotación diaria)
- **SMTP Protocol**: `logs/smtp-protocol.log` (cuando está habilitado)

Configuración:
- **Retención**: 30 días
- **Nivel mínimo**: Information en desarrollo
- **Formato**: JSON estructurado en archivos

## Desarrollo

### Crear una nueva migración
```bash
cd src/AuthService.Api
dotnet ef migrations add NombreDeLaMigracion
dotnet ef database update
```

### Ejecutar pruebas HTTP
El archivo `src/AuthService.Api/AuthService.Api.http` contiene ejemplos de solicitudes HTTP para probar los endpoints localmente.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Braulio Echeverría**  
Curso IN6AM - Kinal Guatemala 2026

## Microservicios Relacionados

Este servicio es parte de la arquitectura de microservicios de Kinal Sports:
- **Authentication Service** (este repositorio)
- Users Management Service
- Sports Events Service
- Notifications Service
- API Gateway

---

**Nota**: Este es un proyecto educativo desarrollado como parte del aprendizaje de arquitectura de microservicios. No está destinado para uso en producción sin las debidas validaciones y pruebas de seguridad adicionales.
